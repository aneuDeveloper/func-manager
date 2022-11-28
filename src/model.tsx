export class FunctionHit {
  data: any
  workflowFunctions: any
  workflowFunctionsVisible: boolean
}
export class FunctionHitList {
  functions: FunctionHit[];
}
export class RootData {
  functionHitList: FunctionHitList;
  test: String;
}
