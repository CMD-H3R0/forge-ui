import SparksWidget from "../components/SparksWidget";
export default function SparksPage(){
  return (
    <div style={{minHeight:"100vh",background:"#0e0f12",color:"#e8e9ea",padding:"48px 16px",display:"flex",justifyContent:"center"}}>
      <SparksWidget user="anon" title="Forge Sparks" />
    </div>
  );
}
