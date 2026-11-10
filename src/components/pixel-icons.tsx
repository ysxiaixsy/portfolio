import type { ComponentType, SVGProps } from "react";
import { ArrowLeft } from "pixelarticons/react/ArrowLeft.js";
import { ArrowRight } from "pixelarticons/react/ArrowRight.js";
import { ArrowUp } from "pixelarticons/react/ArrowUp.js";
import { Check } from "pixelarticons/react/Check.js";
import { CircleInfo } from "pixelarticons/react/CircleInfo.js";
import { Close } from "pixelarticons/react/Close.js";
import { Download } from "pixelarticons/react/Download.js";
import { ExternalLink } from "pixelarticons/react/ExternalLink.js";
import { Facebook } from "pixelarticons/react/Facebook.js";
import { Github } from "pixelarticons/react/Github.js";
import { Instagram } from "pixelarticons/react/Instagram.js";
import { Linkedin } from "pixelarticons/react/Linkedin.js";
import { Loader } from "pixelarticons/react/Loader.js";
import { Mail } from "pixelarticons/react/Mail.js";
import { MapPin } from "pixelarticons/react/MapPin.js";
import { Moon } from "pixelarticons/react/Moon.js";
import { SquareAlert } from "pixelarticons/react/SquareAlert.js";
import { Sun } from "pixelarticons/react/Sun.js";
import { WarningDiamond } from "pixelarticons/react/WarningDiamond.js";

export type IconProps = SVGProps<SVGSVGElement>;

// Every icon on the site, from pixelarticons (24×24 pixel grid), so the set
// changes in one place. Edges stay crisp at any size, and icons are
// decorative unless given a label.
function pixelIcon(Icon: ComponentType<IconProps>) {
  function PixelIcon(props: IconProps) {
    return <Icon aria-hidden="true" shapeRendering="crispEdges" {...props} />;
  }
  return PixelIcon;
}

export const ArrowLeftIcon = pixelIcon(ArrowLeft);
export const ArrowRightIcon = pixelIcon(ArrowRight);
export const ArrowUpIcon = pixelIcon(ArrowUp);
export const CheckIcon = pixelIcon(Check);
export const InfoIcon = pixelIcon(CircleInfo);
export const CloseIcon = pixelIcon(Close);
export const DownloadIcon = pixelIcon(Download);
export const ExternalLinkIcon = pixelIcon(ExternalLink);
export const FacebookIcon = pixelIcon(Facebook);
export const GitHubIcon = pixelIcon(Github);
export const InstagramIcon = pixelIcon(Instagram);
export const LinkedInIcon = pixelIcon(Linkedin);
export const LoaderIcon = pixelIcon(Loader);
export const MailIcon = pixelIcon(Mail);
export const MapPinIcon = pixelIcon(MapPin);
export const MoonIcon = pixelIcon(Moon);
export const AlertIcon = pixelIcon(SquareAlert);
export const SunIcon = pixelIcon(Sun);
export const WarningIcon = pixelIcon(WarningDiamond);
