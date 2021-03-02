import React from 'react';
import { Button, CheckBox, Layout } from "@ui-kitten/components";
import { UpdateWrapper } from "../../screens/Settings/Notifications";
import Select from '../Common/Select';
import { useTranslation } from 'react-i18next';
import useSetting, { ClansAtom } from '../../hooks/useSetting';

export interface ClanSettingsModalProps {
  clan_id: number;
  close: () => void;
}

export default function ClanSettingsModal({ clan_id, close }: ClanSettingsModalProps) {
  const [options, setOptions] = useSetting(ClansAtom);
  const { t } = useTranslation();
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
            Show Shadow Members
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
            Subtract View
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
            User Share Requirements
          </CheckBox>
        )}
      </UpdateWrapper>
      <UpdateWrapper>
        {update => (
          <Select
            style={{ margin: 4 }}
            label="Goal Level"
            value={options[clan_id].level.toString()}
            onValueChange={value => {
              options[clan_id].level = Number(value);
              update();
            }}
            options={[1, 2, 3, 4, 5].map(i => ({
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
        Done
      </Button>
    </Layout>
  );
}
