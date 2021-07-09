export interface ClanRequirementInterface {
  task_id: number;
  top: string;
  bottom: string;
  total?: "min";
  meta?: {
    activity: ("capture" | "deploy" | "capon")[];
    days?: boolean;
    points?: boolean;
    types?: string[];
    exclude?: string[];
  };
  hidden?: string[];
}