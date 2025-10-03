import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";

/**
 * Props for `SwitchPlayground`.
 */
export type SwitchPlaygroundProps =
  SliceComponentProps<Content.SwitchPlaygroundSlice>;

/**
 * Component for "SwitchPlayground" Slices.
 */
const SwitchPlayground: FC<SwitchPlaygroundProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
      innerClassName="flex flex-col justify-center"
    >
      <FadeIn>
        <h2 className="font-bold-slanted scroll-pt-6 text-6xl uppercase md:text-8xl">
          <PrismicText field={slice.primary.heading} />
        </h2>

        <div className="mb-6 max-w-4xl text-xl text-pretty">

        <PrismicRichText field={slice.primary.description} />
        </div>

        <FadeIn targetChildren className="grid grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2">

        {slice.primary.switches.map((item) =>
          isFilled.contentRelationship(item.switch) ? (
            <SharedCanvas key={item.switch.id} color={item.switch} />
          ) : null,
        )}
        </FadeIn>
      </FadeIn>
    </Bounded>
  );
};

export default SwitchPlayground;


type SharedCanvasProps = {
  color: Content.SwitchPlaygroundSliceDefaultPrimarySwitchesItem["switch"]
}

const SharedCanvas = ({color}: SharedCanvasProps) => {
  if(!isFilled.contentRelationship(color) || !color.data) return null;


  const colorName = color.uid as "red" | "brown" | "blue" | "black";
  const {color: hexColor, name} = color.data
}