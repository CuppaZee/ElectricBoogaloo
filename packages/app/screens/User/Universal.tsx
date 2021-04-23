import { RouteProp, useRoute } from "@react-navigation/native";
import {
  Button,
  CheckBox,
  Input,
  Layout,
  Radio,
  RadioGroup,
  Text,
  useTheme,
  Modal,
} from "@ui-kitten/components";
import * as React from "react";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import useComponentSize from "../../hooks/useComponentSize";
import { UserStackParamList } from "../../types";
import useTitle from "../../hooks/useTitle";
import Loading from "../../components/Loading";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import TypeImage from "../../components/Common/TypeImage";
import { useTranslation } from "react-i18next";
import Icon from "../../components/Common/Icon";

interface ReportModalProps {
  munzee: UniversalMunzee;
  close: () => void;
  closeWithNext: () => void;
}

function ReportModal({ munzee, close, closeWithNext }: ReportModalProps) {
  const { t } = useTranslation();
  const [type, setType] = React.useState("invalid_secret_code");
  const [reportSent, setReportSent] = React.useState(false);

  if (reportSent) {
    return (
      <Layout level="1" style={{ borderRadius: 8, padding: 8, width: 300, maxWidth: "100%" }}>
        <Text category="h6" style={{ textAlign: "center", margin: 4 }} status="success">
          {t("user_universal_capper:report_sent")}
        </Text>
        <Button
          style={{ margin: 4 }}
          appearance="outline"
          accessoryLeft={props => <Icon name="close" {...props} />}
          onPress={() => {
            closeWithNext();
            setReportSent(false);
          }}>
          {t("user_universal_capper:report_close")}
        </Button>
      </Layout>
    );
  }

  return (
    <Layout level="1" style={{ borderRadius: 8, padding: 8, width: 300, maxWidth: "100%" }}>
      <RadioGroup
        selectedIndex={
          ["invalid_secret_code", "not_deployed"].indexOf(type) === -1
            ? 2
            : ["invalid_secret_code", "not_deployed"].indexOf(type)
        }
        onChange={index => setType(["invalid_secret_code", "not_deployed", ""][index])}>
        <Radio>{t("user_universal_capper:report_invalid_secret_code")}</Radio>
        <Radio>{t("user_universal_capper:report_not_deployed")}</Radio>
        <Radio>{t("user_universal_capper:report_other")}</Radio>
      </RadioGroup>
      {type !== "invalid_secret_code" && type !== "not_deployed" && (
        <Input
          style={{ margin: 4 }}
          label={t("user_universal_capper:report_note")}
          value={type}
          onChangeText={text => {
            setType(text);
          }}
        />
      )}
      <View style={{ flexDirection: "row" }}>
        <Button
          style={{ margin: 4 }}
          appearance="ghost"
          accessoryLeft={props => <Icon name="close" {...props} />}
          onPress={close}
        />
        <Button
          appearance="outline"
          status="warning"
          style={{ margin: 4, flex: 1 }}
          onPress={async () => {
            await fetch(
              `https://server.cuppazee.app/user/universal/report/v1?report=${encodeURIComponent(
                JSON.stringify({ qr: munzee, data: type }, null, 2)
              )}`
            );
            setReportSent(true);
          }}>
          {t("user_universal_capper:report_report")}
        </Button>
      </View>
    </Layout>
  );
}

interface SubmitModalProps {
  close: () => void;
}

function SubmitModal({ close }: SubmitModalProps) {
  const { t } = useTranslation();
  const [code, setCode] = React.useState("");
  const [submitted, setSubmitted] = React.useState(0);

  if (submitted === 2) {
    return (
      <Layout level="1" style={{ borderRadius: 8, padding: 8, width: 300, maxWidth: "100%" }}>
        <Text category="h6" style={{ textAlign: "center", margin: 4 }} status="success">
          {t("user_universal_capper:submit_submitted")}
        </Text>
        <Button
          style={{ margin: 4 }}
          appearance="outline"
          accessoryLeft={props => <Icon name="close" {...props} />}
          onPress={() => {
            close();
            setSubmitted(0);
          }}>
          {t("user_universal_capper:submit_close")}
        </Button>
      </Layout>
    );
  }

  if (submitted === 1) {
    return (
      <Layout level="1" style={{ borderRadius: 8, padding: 8, width: 300, maxWidth: "100%" }}>
        <Text category="h6" style={{ textAlign: "center", margin: 4 }} status="warning">
          {t("user_universal_capper:submit_error")}
        </Text>
        <Button
          style={{ margin: 4 }}
          appearance="outline"
          onPress={() => {
            setSubmitted(0);
          }}>
          {t("user_universal_capper:submit_try_again")}
        </Button>
      </Layout>
    );
  }

  return (
    <Layout level="1" style={{ borderRadius: 8, padding: 8, width: 300, maxWidth: "100%" }}>
      <Input
        style={{ margin: 4 }}
        label={t("user_universal_capper:submit_code")}
        caption={t("user_universal_capper:submit_code_hint")}
        value={code}
        onChangeText={text => {
          setCode(text);
        }}
      />
      <View style={{ flexDirection: "row" }}>
        <Button
          style={{ margin: 4 }}
          appearance="ghost"
          accessoryLeft={props => <Icon name="close" {...props} />}
          onPress={close}
        />
        <Button
          appearance="outline"
          status="success"
          style={{ margin: 4, flex: 1 }}
          onPress={async () => {
            const response = await fetch(
              `https://server.cuppazee.app/user/universal/submit/v1?code=${encodeURIComponent(
                code
              )}`
            );
            if (response.ok) {
              setSubmitted(2);
            } else {
              setSubmitted(1);
            }
          }}>
          {t("user_universal_capper:submit_submit")}
        </Button>
      </View>
    </Layout>
  );
}

export interface UniversalType {
  icon: string;
  id: string;
  name: string;
}

export interface UniversalMunzee {
  munzee: string;
  type: UniversalType;
  munzee_id: string;
}

export interface UniversalData {
  munzees: UniversalMunzee[];
  total: number;
  capped: number;
  types: UniversalType[];
  cacheID: number;
  token: string;
}

function useWatch(munzee_id?: string, user_id?: number, token?: string) {
  const [attempts, setAttempts] = React.useState<{ [munzee_id: string]: number }>({});
  const [response, setResponse] = React.useState<string>();
  React.useEffect(() => {
    var interval = setInterval(async () => {
      if (munzee_id && token && user_id && (!attempts[munzee_id] || attempts[munzee_id] < 10)) {
        try {
          const formBody = new FormData();
          formBody.append(
            "data",
            JSON.stringify({
              munzee_id,
              attempt: attempts[munzee_id],
              page: 0,
              access_token: token,
            })
          );
          formBody.append("access_token", token);
          const response = await fetch(`https://api.munzee.com/munzee/captures`, {
            method: "POST",
            body: formBody,
          });
          const { data } = await response.json();
          if (data?.find((i: { user_id: number }) => i.user_id.toString() === user_id.toString())) {
            setResponse(munzee_id);
            setAttempts(att => ({ ...att, [munzee_id]: 10 }));
          } else {
            setAttempts(att => ({ ...att, [munzee_id]: (att[munzee_id] || 0) + 1 }));
          }
        } catch (e) {
          setAttempts(att => ({ ...att, [munzee_id]: (att[munzee_id] || 0) + 1 }));
        }
      }
    }, 1500);
    return () => clearInterval(interval);
  });
  return munzee_id !== undefined && response === munzee_id;
}

export default function UserChallengesScreen() {
  const { t } = useTranslation();
  const [size, onLayout] = useComponentSize();
  const route = useRoute<RouteProp<UserStackParamList, "Universal">>();
  const theme = useTheme();
  const [index, setIndex] = React.useState(0);
  const [filter, setFilter] = React.useState<string[]>([]);
  const [filterID, setFilterID] = React.useState(0);
  const [reportModal, setReportModal] = React.useState(false);
  const [submitModal, setSubmitModal] = React.useState(false);
  useTitle(`☕ ${route.params.username} - ${t("pages:user_universal_capper")}`);
  const user = useMunzeeRequest(
    "user",
    { username: route.params?.username },
    route.params?.username !== undefined
  );
  const data = useCuppaZeeRequest<{ data: UniversalData }>(
    "user/universal/v5",
    { username: route.params?.username, filter: filter.join(","), filterID },
    route.params?.username !== undefined && user.data?.data?.user_id !== undefined,
    user.data?.data?.user_id
  );
  const munzee = data.data?.data.munzees[index];
  const details = useMunzeeRequest(
    "munzee",
    { munzee_id: Number(munzee?.munzee_id) },
    !!munzee?.munzee_id
  );
  const shouldSkip = useWatch(munzee?.munzee_id, user.data?.data?.user_id, data.data?.data.token);
  React.useEffect(() => {
    if (shouldSkip) {
      setIndex(index + 1);
    }
  }, [munzee?.munzee_id, shouldSkip]);

  if (!data.data || !size) {
    return (
      <Layout onLayout={onLayout} style={{ flex: 1 }}>
        <Loading data={[user, data]} />
      </Layout>
    );
  }

  return (
    <Layout onLayout={onLayout} style={{ flex: 1 }}>
      {munzee && (
        <Modal
          backdropStyle={{ backgroundColor: "#00000077" }}
          visible={reportModal}
          onBackdropPress={() => setReportModal(false)}>
          <ReportModal
            close={() => setReportModal(false)}
            closeWithNext={() => {
              setReportModal(false);
              setIndex(index + 1);
            }}
            munzee={munzee}
          />
        </Modal>
      )}
      <Modal
        backdropStyle={{ backgroundColor: "#00000077" }}
        visible={submitModal}
        onBackdropPress={() => setSubmitModal(false)}>
        <SubmitModal close={() => setSubmitModal(false)} />
      </Modal>
      <View style={{ alignSelf: "center", maxWidth: "100%" }}>
        <Text style={{ textAlign: "center" }} category="h6">
          {t("user_universal_capper:remaining", {
            remaining: data.data.data.total - data.data.data.capped - index,
            total: data.data.data.total,
          })}
        </Text>
        {data.data.data.types.map(i => (
          <CheckBox
            onChange={checked => {
              if (checked) {
                setFilter([...filter, i.id]);
              } else {
                setFilter(filter.filter(a => a !== i.id));
              }
              setFilterID(i => i + 1);
            }}
            style={{ margin: 8 }}
            checked={filter.includes(i.id)}>
            {i.name}
          </CheckBox>
        ))}
      </View>
      {munzee ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View>
            <QRCode
              size={200}
              value={`https://www.munzee.com/m/${munzee.munzee}/`}
              color={theme["text-basic-color"]}
              backgroundColor={theme["background-basic-color-1"]}
            />
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <TypeImage style={{ size: 72 }} iconSize={128} icon={munzee.type.icon} />
            </View>
          </View>
          <Text style={{ textAlign: "center" }} category="h6">
            {details.data?.data?.friendly_name ?? munzee.munzee}
          </Text>
          <Text style={{ textAlign: "center" }} category="s1">
            {t("user_universal_capper:owned_by", {
              username: details.data?.data?.creator_username ?? munzee.munzee.split("/")[0],
            })}
          </Text>
          <Text style={{ textAlign: "center" }} category="c1">
            {t("user_universal_capper:deploy", {
              date: details.data?.data?.deployed_at || "???",
            })}
          </Text>
          <Button
            onPress={() => setIndex(index + 1)}
            style={{ margin: 4 }}
            appearance="outline"
            accessoryRight={props => <Icon name="arrow-right" {...props} />}>
            {t("user_universal_capper:next")}
          </Button>
          <Button
            onPress={() => setReportModal(true)}
            style={{ margin: 4 }}
            appearance="ghost"
            status="warning"
            accessoryLeft={props => <Icon name="alert" {...props} />}>
            {t("user_universal_capper:report")}
          </Button>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ textAlign: "center" }} category="s1">
            {t("user_universal_capper:empty")}
          </Text>
        </View>
      )}
      <View style={{ width: 400, maxWidth: "100%", alignSelf: "center", padding: 4 }}>
        <Button
          onPress={() => setSubmitModal(true)}
          appearance="outline"
          status="success"
          accessoryRight={props => <Icon name="check-bold" {...props} />}>
          {t("user_universal_capper:submit")}
        </Button>
      </View>
    </Layout>
  );
}
