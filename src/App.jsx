import Header from './layouts/Header'
import { BookOpen } from 'lucide-react'
import Toolbar from './layouts/Toolbar'
import Container from './components/Container'
import { useState } from 'react'
import Editor from './layouts/Editor'

const breadCrumbs = [
  <div key={0} className='flex gap-1 items-center'>
    <BookOpen size={18} />
    <span>Main</span>
  </div>,
  "Getting Started",
]

function App() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const updateTitle = (ev) => {
    if (ev.key === 'Enter') {
      ev.target.blur();
      return;
    }

    setTitle(ev.target.value)
  }

  const updateText = (ev) => {
    setText(ev.target.outerText)
  }

  return (
    <main>
      <Header breadCrumbs={[...breadCrumbs, title]} />
      <Container>
        <Toolbar
          username="L Doe"
          userIcon={<img height={35} width={35} src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' />}
          readTime={3}
          viewCount={123}
        />
        <Editor
          title={title}
          text={text}
          onTitleUpdate={updateTitle}
          onTextUpdate={updateText}
        />
      </Container>
    </main>
  )
}

export default App
