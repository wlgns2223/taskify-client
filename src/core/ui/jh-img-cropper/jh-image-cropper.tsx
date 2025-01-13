import Cropper, { CropperProps } from "react-easy-crop";
import { JHInput } from "../jh-input";
import { useState } from "react";
import { TPixelCrop } from "./get-crop-img";

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.1;

interface JHImageCropperProps
  extends Omit<
    Partial<CropperProps>,
    "image" | "crop" | "zoom" | "onCropChange" | "onZoomChange"
  > {
  image: string;
}
export const JHImageCropper: React.FC<JHImageCropperProps> = ({
  image,
  ...props
}) => {
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<TPixelCrop | null>(
    null
  );
  const handleCompleteCrop = (
    croppedArea: TPixelCrop,
    cropppedAreaPixels: TPixelCrop
  ) => {
    setCroppedAreaPixels(cropppedAreaPixels);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="relative w-full h-[200px]">
        <Cropper
          image={image} // 원본 이미지
          zoom={zoom}
          onZoomChange={setZoom}
          onCropChange={setCrop}
          onCropComplete={handleCompleteCrop}
          aspect={4 / 3}
          crop={crop}
          {...props}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="zoom" className="sr-only">
          {"Image Zoom"}
        </label>
        <span className="text-sm">{`Zoom: ${zoom}`}</span>
        <JHInput
          variant="reset"
          id="zoom"
          type="range"
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          step={ZOOM_STEP}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
        />
      </div>
    </div>
  );
};
