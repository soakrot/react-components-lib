import { Meta, StoryObj } from "@storybook/react";
import ProductGallery, { ProductImg } from "./ProductGallery";
import img1 from "/assets/product-images/image-product-1.jpg";
import imgThumbnail1 from "/assets/product-images/image-product-1-thumbnail.jpg";
import img2 from "/assets/product-images/image-product-2.jpg";
import imgThumbnail2 from "/assets/product-images/image-product-2-thumbnail.jpg";
import img3 from "/assets/product-images/image-product-3.jpg";
import imgThumbnail3 from "/assets/product-images/image-product-3-thumbnail.jpg";

const meta: Meta<typeof ProductGallery> = {
  title: "display/Product Gallery",
  component: ProductGallery,
};

type Story = StoryObj<typeof ProductGallery>;

const imgs: ProductImg[] = [
  {
    hero: img1,
    thumbnail: imgThumbnail1,
    alt: "shoes placed on the ground with orange and beige background",
  },
  {
    hero: img2,
    thumbnail: imgThumbnail2,
    alt: "a shoe placed on top of two oval rocks and other shoe placed on it's tip vertically beside it",
  },
  {
    hero: img3,
    thumbnail: imgThumbnail3,
    alt: "a shoe placed on top of two oval rocks with orange background",
  },
];

const Default: Story = {
  render() {
    return <ProductGallery productImgs={imgs} />;
  },
};

export default meta;
export { Default };
