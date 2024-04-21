import type { Metadata } from "next";
import { H1 } from "@/components/ui/H1";
import Image from "next/image";
// assets
import portrait from "@/assets/portrait.png"
import AIChatButton from "@/components/AIChatButton";

export const metadata: Metadata = {
  title: "Portfolio"
}

export default function Home() {
  return (
    <section className="bg-[url('/background.png')] bg-cover bg-no-repeat flex min-h-screen flex-col items-center justify-between p-16 space-y-3">
      {/* <p>Blocks are open source. You can find the source on GitHub. Use them in your projects, customize them and contribute back.</p>
      <p>Blocks are open source. You can find the source on GitHub. Use them in your projects, customize them and contribute back.</p>
      <div>
        <Image src={portrait} alt="Portrait" height={300} width={300} className="rounded-full aspect-square border-2 object-cover shadow-md" />
      </div> */}
      <H1>Ask me something 🔮</H1>
      <p>Blocks are open source. You can find the source on GitHub. Use them in your projects, customize them and contribute back.</p>
      <AIChatButton />
      <H1>Smart WebP, PNG and JPEG Compression for Faster Websites</H1>
      <h2>Optimization for each project</h2>
      <p>Tailored solutions for website owners, developers, and designers, ensuring optimal website performance for every project. Discover the advantages of faster loading times with our image optimization tools.</p>
      <h2>Web Pro and Web Ultra</h2>
      <p>The online compressor empowers you to easily optimize your images. Seamlessly convert to WebP or efficiently compress extensive batches to minimize file sizes, all with ease.</p>
      <h2>Tinify CDN</h2>

      <p>Power up your website with Tinify's Image CDN. Harness the power of multiple content delivery networks along with advanced image optimization for unmatched reliability and performance.</p>
      <p>Tinify CDN makes it easier than ever to speed up your website and optimize your images. Tinify’s automated image optimization does not need any manual fine-tuning. Great results, every time!</p>
      <p>Tinify CDN is super easy to set up. We’ve made installation guides for the most popular content management systems and frameworks. Browse the list to find a guide for you. We keep adding more!</p>

      <h2>Developer API</h2>
      <p>Automate your WebP, JPEG and PNG compression workflow</p>
      <p>Hook up your server to optimize all your WebP, JPEG and PNG images on the fly. Join over 50.000 companies and developers around the world who are using the API. Enter your name and email address below to retrieve your key and get started.</p>
      <h3>Features</h3>
      <strong>Same API for WebP, JPEG & PNG images</strong>
      <p>The API compresses WebP, JPEG and PNG images. You only have to upload your source image and download the result. Everything else happens automatically.</p>

      <strong>Upload directly or provide a URL to the image</strong>
      <p>You can either upload images directly or specify a URL to the image you want to compress.</p>

      <strong>Convert images to WebP, JPEG or PNG (new)</strong>
      <p>Convert your images to another format, or ask the API to give you the smallest image format! Images with a transparent background can be filled with a color you specify.</p>

      <strong>Preserve metadata</strong>
      <p>You can choose to preserve copyright information, the GPS location and the creation date in the compressed JPEG images. For PNG images the copyright information can be preserved.</p>

      <strong>Amazon S3 and Google Cloud Storage (new)</strong>
      <p>You can instruct the API to save the optimized images directly in your Amazon S3 or Google Cloud Storage buckets. When doing this you may also set custom Cache-Control and Expires headers.</p>

      <strong>Perfect image resizing</strong>
      <p>The API can resize your images as well as optimising them. You only have to upload the original once and then generate the image sizes you need. Resizing includes correct gamma scaling, bicubic transparency edge correction and natural image sharpening.</p>

      <strong>Area of interest detection</strong>
      <p>Take advantage of smart cropping to create thumbnails with different aspect ratios. The API will resize your images and crop away the parts that are visually the least interesting.</p>

    </section>
  )
}
