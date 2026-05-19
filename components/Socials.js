import Link from "next/link"
import { FaGithub, FaLinkedin } from "react-icons/fa"

const socials = [
    { icon:<FaGithub />, path: "https://github.com/woafi" },
    { icon:<FaLinkedin />, path: "https://www.linkedin.com/in/mohammad-woafi-013518207/" },
];

function Socials({containerStyle, iconStyle}) {
  return (
    <div className={containerStyle}>
      {socials.map((social, index) => (
        <Link href={social.path} target="_blank" key={index} className={iconStyle}>
          {social.icon}
        </Link>
      ))}
    </div>
  )
}

export default Socials
