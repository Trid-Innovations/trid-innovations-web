import { ColorRing } from "react-loader-spinner";

function Loader() {
  return (
    <div
      id="popup-modal"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      tabIndex={-1}
      className="fixed inset-x-0 top-0 z-50 flex h-[calc(100%-1rem)] items-center justify-center overflow-y-auto overflow-x-hidden
        p-4  md:inset-0 md:h-full"
    >
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#31A1A6", "#C4CD35", "#EB9A61", "#49AA97", "#E8A85F"]}
      />
    </div>
  );
}

export default Loader;
