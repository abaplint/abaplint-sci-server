import * as abaplint from "abaplint";

interface ObjectIdentifer {
  objectName: string;
  objectType: string;
}

interface InputFile {
  name: string;
  contents: string;
}

interface CheckObjectInput {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  configuration: any;
  object: ObjectIdentifer;
  files: InputFile[];
}

interface CheckObjectOutput {
  object: ObjectIdentifer;
  issues: abaplint.Issue[];
}

export function checkObject(input: CheckObjectInput): CheckObjectOutput {
  const output: CheckObjectOutput = {
    object: input.object,
    issues: [],
  };

// todo
//  const config = new abaplint.Config(JSON.stringify(input.configuration));
  const config = abaplint.Config.getDefault();
  const reg = new abaplint.Registry(config);
  for (const f of input.files) {
    const file = new abaplint.MemoryFile(f.name, f.contents);
    reg.addFile(file);
  }
  output.issues = reg.findIssues();

  return output;
}