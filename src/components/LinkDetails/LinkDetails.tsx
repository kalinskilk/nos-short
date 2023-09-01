import { useCountdown } from "../../services/CountDown.service";
import "./LinkDetails.css";

function LinkDetails(props: {
  url: string;
  dateExpires: string;
  removeLinkExpired: Function;
}) {
  const [days, hours, minutes, seconds] = useCountdown(props.dateExpires);

  const timeExpires = () => {
    let str = ``;
    if (days + hours + minutes + seconds <= 0) {
      str = "Link expirado";
      props.removeLinkExpired();
      return str;
    }
    if (days) {
      str += ` ${days > 1 ? days + " dias" : days + " dia"}`;
    }
    if (hours) {
      str += ` ${hours > 1 ? hours + " horas" : hours + " hora"}`;
    }
    if (minutes) {
      str += ` ${minutes > 1 ? minutes + " minutos" : minutes + " minuto"}`;
    }
    if (seconds) {
      str += ` ${seconds > 1 ? seconds + " segundos" : seconds + " segundo"}`;
    }
    return `Expira em: ${str}`;
  };
  return (
    <>
      <div className="detail-container">
        <small>Link original: {props.url}</small>
        <br />
        <small>{timeExpires()}</small>
      </div>
    </>
  );
}
export default LinkDetails;
