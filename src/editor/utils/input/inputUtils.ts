type InputTypes = "text" | "command" | "link" | "heading"

type InputType = {
  input: string;
  type: InputTypes;
}

class InputUtils {
  static queryInputType(ev: React.KeyboardEvent): InputType {
    switch (ev.key) {
      default:
        return { type: "text", input: ev.key }
      case "/":
        return { type: "command", input: ev.key }
      case "@":
        return { type: "link", input: ev.key }
      case "#":
        return { type: "heading", input: ev.key }
    }
  }

}

export default InputUtils;