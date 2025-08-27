import "./VolumeSlider.css";

import { ChangeEvent, WheelEvent } from "react";
import { AudioOutput } from "zebar";

const MAX_VOLUME = 50;

function formatVolumeIcon(audio: AudioOutput | null) {
  if (audio == null || audio.defaultPlaybackDevice == null) return "nf-fa-volume_off";
  if (audio.defaultPlaybackDevice.isMuted) return "nf-oct-mute";
  const volume = audio.defaultPlaybackDevice.volume;
  if (volume > 20) return "nf-fa-volume_high";
  if (volume > 15) return "nf-fa-volume_up";
  if (volume > 10) return "nf-fa-volume_down";
  if (volume > 0) return "nf-fa-volume_low";
  return "nf-fa-volume_off";
}

export type VolumeSliderProps = {
    audio: AudioOutput | null;
};

export function VolumeSlider({ audio }: VolumeSliderProps) {
    const volume =
        Math.min(
            50,
            audio == null || audio.defaultPlaybackDevice == null
                ? 0
                : audio.defaultPlaybackDevice.volume
        );
    
    function onVolumeChange(event: ChangeEvent<HTMLInputElement>) {
        if (audio != null && audio.defaultPlaybackDevice != null) {
            audio.setVolume(Number(event.currentTarget.value));
        }
    }

    function onVolumeScroll(event: WheelEvent<HTMLInputElement>) {
        if (audio != null && audio.defaultPlaybackDevice != null) {
            const delta = Math.sign(event.deltaY);
            const volume =
                Math.max(
                    audio.defaultPlaybackDevice.volume - delta * 2,
                    0,
                )
            audio.setVolume(volume);
        }
    }

    function onToggleMute() {
        if (audio != null && audio.defaultPlaybackDevice != null) {
            audio.setMute(!audio.defaultPlaybackDevice.isMuted);
        }
    }

    return (
        <>
            <input
                id="volume-slider"
                type="range"
                min={0}
                max={MAX_VOLUME}
                value={volume}
                onChange={onVolumeChange}
                onWheel={onVolumeScroll}
                style={{
                    "--slider-value": `${volume * 2}%`
                } as React.CSSProperties}
            />
            <div
                id="toggle-audio"
                className={`nf ${formatVolumeIcon(audio)} chip-icon`}
                onClick={onToggleMute}
            />
        </>
    );
}