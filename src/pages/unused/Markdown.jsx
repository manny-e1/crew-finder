import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

function Mark() {
  const markdown = `Here is some JavaScript code:

  ~~~js
  console.log('It works!')
  ~~~
  `;
  const [input, setInput] = useState('');
  console.log(input);
  return (
    <div className="flex">
      <textarea
        name=""
        id=""
        className="w-1/2 h-screen"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <ReactMarkdown
        className="w-1/2 h-screen"
        children={input}
        components={{
          code: Component,
          blockquote: Component,
        }}
      />
    </div>
  );
}

export default Mark;

const Component = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <SyntaxHighlighter
      children={String(children).replace(/\n$/, '')}
      style={darcula}
      language={match[1]}
      PreTag="div"
      {...props}
    />
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
