import { parseSync as babelParse } from "@babel/core";
import convert from "./convert";
import { normalizeBabelParseConfig } from "./configuration";

export default function parse(code, options) {
  const parseOptions = normalizeBabelParseConfig(options);
  let ast;

  try {
    ast = babelParse(code, parseOptions);
  } catch (err) {
    if (err instanceof SyntaxError) {
      err.lineNumber = err.loc.line;
      err.column = err.loc.column;
    }

    throw err;
  }

  convert(ast, code);

  return ast;
}
