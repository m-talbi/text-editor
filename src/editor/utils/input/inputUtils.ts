type InputTypes = "text" | "command" | "link" | "heading"

type InputType = {
  input: string;
  type: InputTypes;
}

class InputUtils {
  static queryInputType(key: string): InputType {
    switch (key) {
      default:
        return { type: "text", input: key }
      case "/":
        return { type: "command", input: key }
      case "@":
        return { type: "link", input: key }
      case "#":
        return { type: "heading", input: key }
    }
  }

}

export default InputUtils;