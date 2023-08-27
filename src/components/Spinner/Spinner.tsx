import "./Spinner.css";

function Spinner(props: { loading: boolean }) {
  return (
    <span
      className={props.loading ? "spinner" : ""}
      hidden={!props.loading}
    ></span>
  );
}

export default Spinner;
