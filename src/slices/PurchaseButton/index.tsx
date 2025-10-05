import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import clsx from "clsx";

/**
 * Props for `PurchaseButton`.
 */
export type PurchaseButtonProps =
  SliceComponentProps<Content.PurchaseButtonSlice>;

/**
 * Component for "PurchaseButton" Slices.
 */
const PurchaseButton: FC<PurchaseButtonProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <FadeIn
        className="relative mx-auto max-w-7xl px-4 text-center"
        targetChildren
      >
        <p className="mb-6 text-xl font-medium text-gray-700 md:text-2xl">
          {slice.primary.eyebrow}
        </p>

        <h2 className="font-bold-slanted mb-8 scroll-pt-6 text-5xl text-gray-900 uppercase md:text-7xl lg:text-8xl">
          <PrismicText field={slice.primary.heading} />
        </h2>

        <button
          className={clsx(
            "group relative w-full overflow-hidden rounded-full border-8 border-gray-900 bg-linear-to-r/oklch from-sky-300 to-sky-600 px-6 py-6 ease-out focus:ring-[24px] focus:ring-sky-500/50 focus:outline-none",
          )}
        >
          {slice.primary.button_text}
        </button>

        <PrismicRichText field={slice.primary.body} />
      </FadeIn>
    </Bounded>
  );
};

export default PurchaseButton;
