import Header from './layouts/Header'
import { BookOpen } from 'lucide-react'
import Toolbar from './layouts/Toolbar'
import { useState } from 'react'

const breadCrumbs = [
  <div key={0} className='flex gap-1 items-center'>
    <BookOpen size={18} />
    <span>Main</span>
  </div>,
  "Getting Started",
]

function App() {
  const [title] = useState('My new Frontend Project')

  return (
    <main>
      <Header breadCrumbs={[...breadCrumbs, title]} />
      <div className='px-[12vw] pt-4'>
        <Toolbar
          username="L Doe"
          userIcon={<img height={35} width={35} src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' />}
          readTime={3}
          viewCount={123}
        />
        {/* TODO: EDITOR */}
      </div>
    </main>
  )
}

export default App
