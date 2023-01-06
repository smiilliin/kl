declare global {
  interface Api {
    runProgram: (programCode: string) => void;
  }
  interface Window {
    api: Api;
  }
}

export default global;
