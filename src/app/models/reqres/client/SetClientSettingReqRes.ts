import { ClientSettingName } from "../../../enums/client/clientSettingName"

export interface ClientSettingPair {
  name: ClientSettingName,
  value: string
}

export interface SetClientSettingRequest {
  clientSetting: ClientSettingPair
}
export interface SetClientSettingResponse { }