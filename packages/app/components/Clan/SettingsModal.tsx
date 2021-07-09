import React from 'react';
import { Button, CheckBox, Layout } from "@ui-kitten/components";
import { UpdateWrapper } from "../../screens/Settings/Notifications";
import Select from '../Common/Select';
import { useTranslation } from 'react-i18next';
import useSetting, { ClansAtom } from '../../hooks/useSetting';

export interface ClanSettingsModalProps {
  clan_id: number;
  close: () => void;
  levels: number[];
}

export default function ClanSettingsModal({ clan_id, close, levels }: ClanSettingsModalProps) {
  const [options, setOptions] = useSetting(ClansAtom);
  const { t } = useTranslation();
  const goalLevel = Math.min(Math.max(options[clan_id].level, 0), levels.length);
  return (
    <Layout level="4" style={{ borderRadius: 8, padding: 4 }}>
      <UpdateWrapper>
        {update => (
          <CheckBox
            style={{ margin: 8 }}
            checked={options[clan_id].shadow}
            onChange={checked => {
              options[clan_id].shadow = checked;
              update();
            }}>
            {t("clan:settings_shadow")}
          </CheckBox>
        )}
      </UpdateWrapper>
      <UpdateWrapper>
        {update => (
          <CheckBox
            style={{ margin: 8 }}
            checked={options[clan_id].subtract}
            onChange={checked => {
              options[clan_id].subtract = checked;
              update();
            }}>
            {t("clan:settings_subtract")}
          </CheckBox>
        )}
      </UpdateWrapper>
      <UpdateWrapper>
        {update => (
          <CheckBox
            style={{ margin: 8 }}
            checked={options[clan_id].share}
            onChange={checked => {
              options[clan_id].share = checked;
              update();
            }}>
            {t("clan:settings_share")}
          </CheckBox>
        )}
      </UpdateWrapper>
      <UpdateWrapper>
        {update => (
          <Select
            style={{ margin: 4 }}
            label={t("clan:settings_goal")}
            value={goalLevel.toString()}
            onValueChange={value => {
              options[clan_id].level = Number(value);
              update();
            }}
            options={levels.map(i => ({
              label: t("clan:level", { level: i }),
              value: i.toString(),
            }))}
          />
        )}
      </UpdateWrapper>
      <Button
        style={{ margin: 4, flex: 1 }}
        onPress={() => {
          close();
          setOptions({ ...options });
        }}>
        {t("clan:settings_done")}
      </Button>
    </Layout>
  );
}
