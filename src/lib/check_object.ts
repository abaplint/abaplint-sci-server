import * as abaplint from "@abaplint/core";

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
  deps?: InputFile[];
}

export interface CheckObjectOutput {
  object: ObjectIdentifer;
  issues: readonly abaplint.Issue[];
}

export function checkObject(input: CheckObjectInput): CheckObjectOutput {
  const output: CheckObjectOutput = {
    object: input.object,
    issues: [],
  };

  const config = new abaplint.Config(Buffer.from(input.configuration, "base64").toString());
  // todo, if parsing of the config fails, fall back to the default, const config = abaplint.Config.getDefault();
  const reg = new abaplint.Registry(config);
  for (const f of input.files) {
    const file = new abaplint.MemoryFile(f.name, Buffer.from(f.contents, "base64").toString());
    reg.addFile(file);
  }
  if (input.deps) {
    for (const d of input.deps) {
      const file = new abaplint.MemoryFile(d.name, Buffer.from(d.contents, "base64").toString());
      reg.addDependencies([file]);
    }
  }
  output.issues = reg.findIssues();

  return output;
}