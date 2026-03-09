import Heading from "../../(global_components)/Heading";
import DefaultOrg from "./(panel_components)/DefaultOrg";

export default function Panel() {
  return (
    <div className="space-y-5">
      <Heading text="Boshqaruv paneli" />
      <DefaultOrg />
    </div>
  );
}
