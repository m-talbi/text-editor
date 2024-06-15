import Header from "./layouts/Header";
import { BookOpen } from "lucide-react";
import Toolbar from "./layouts/Toolbar";
import Container from "./components/Container";
import { useState } from "react";
import Editor from "./layouts/Editor";
import EditorProvider from "./contexts/EditorContext";
import EditorStateProvider from "./contexts/EditorStateContext";

const breadCrumbs = [
  <div key={0} className="flex gap-1 items-center">
    <BookOpen size={18} />
    <span>Main</span>
  </div>,
  "Getting Started",
];

function App() {
  const [title, setTitle] = useState("");

  const updateTitle = (ev) => {
    if (ev.key === "Enter") {
      ev.target.blur();
      return;
    }

    setTitle(ev.target.value);
  };

  return (
    <main>
      <Header
        breadCrumbs={[
          ...breadCrumbs,
          title.length >= 27 ? title.slice(0, 27) + "..." : title,
        ]}
      />
      <Container>
        <Toolbar username="L Doe" readTime={3} viewCount={123} />
        <EditorProvider>
          <EditorStateProvider>
            <Editor title={title} onTitleUpdate={updateTitle} />
          </EditorStateProvider>
        </EditorProvider>
      </Container>
    </main>
  );
}

export default App;
