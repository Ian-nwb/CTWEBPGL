const articles = [
  {
    name: 'react-props-and-styling', // String
    title: 'Understanding React Props and Styling', // String
    // List --> String
    content: [
      "Props (short for properties) allow you to pass data between components. They are read-only and essential for component reusability.",
      "Example:\nfunction Welcome(props) {\n return <h1>Hello, {props.name}!</h1>;\n}\n",
      "React supports multiple styling approaches: inline styles, CSS files, CSS Modules, and styled-components.",
      "Inline Style Example:\nconst style = { color: 'blue' };\n<p style={style}>Styled Text</p>"
    ]
  },
  {
    name: 'react-functional-components',
    title: 'React Functional Components',
    content: [
      "Functional components are simple JavaScript functions that return JSX.",
      "They are stateless by default but can use hooks like useState and useEffect.",
      "Example:\nfunction HelloWorld() {\n return <h1>Hello, World!</h1>;\n}\n",
      "They are preferred in modern React apps for simplicity and performance."
    ]
  },
  {
    name: 'react-component-lifecycle',
    title: 'React Component Lifecycle',
    content: [
      "Class components have lifecycle methods: mounting, updating, unmounting.",
      "Key methods include: componentDidMount, componentDidUpdate, componentWillUnmount.",
      "Functional components use the useEffect hook to mimic lifecycle behavior.",
      "Example:\nuseEffect(() => {\n console.log('Mounted');\n return () => console.log('Unmounted');\n}, []);"
    ]
  },
  {
    name: 'react-routing-basics',
    title: 'React Router Basics',
    content: [
      "React Router allows navigation between pages without a page reload.",
      "Set up routes using BrowserRouter, Routes, and Route components.",
      "Example:\n<Routes>\n <Route path='/' element={<Home />} />\n <Route path='/about' element={<About />} />\n</Routes>",
      "Use Link component for navigation:\n<Link to='/about'>About</Link>"
    ]
  },
  {
    name: 'react-state-management',
    title: 'Managing State in React',
    content: [
      "State allows components to keep track of dynamic data.",
      "useState hook lets functional components manage state.",
      "Example:\nconst [count, setCount] = useState(0);",
      "Updating state triggers a re-render with the new value."
    ]
  }
];

export default articles;