import styles from "./page.module.css";
import ImageUpload from "./components/ImageUpload";

export default function Home() {
  return (
    <div className={styles.page}>
      <ImageUpload />
    </div>
  );
}
