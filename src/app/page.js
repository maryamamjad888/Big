import styles from "./page.module.css";
import Navbar from './components/Navbar/Navbar'
import ProjectList from './components/Projects/ProjectList';

export default function Home() {
  return (
    <>
    <Navbar />
    <ProjectList />
    </>
  );
}
