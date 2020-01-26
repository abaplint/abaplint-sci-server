import * as abaplint from "abaplint";

interface ObjectIdentifer {
  objectName: string;
  objectType: string;
}

interface InputFile {
  name: string;
  /** base64 encoded */
  contents: string;
}

interface CheckObjectInput {
  /** base64 encoded */
  configuration: string;
  object: ObjectIdentifer;
  files: InputFile[];
  deps: InputFile[];
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
    const file = new abaplint.MemoryFile(f.name, Buffer.from(f.contents, "base64").toString());
    reg.addFile(file);
  }
  for (const d of input.deps) {
    const file = new abaplint.MemoryFile(d.name, Buffer.from(d.contents, "base64").toString());
    reg.addDependencies([file]);
  }
  output.issues = reg.findIssues();

  return output;
}