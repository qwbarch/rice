import "./App.css";

import { useState, useEffect } from "react";
import * as zebar from "zebar";
import { CpuOutput, DateOutput, MemoryOutput } from "zebar";
import { Progress } from "./component/Progress";
import { Chip } from "./component/Chip";
import { VolumeSlider } from "./component/VolumeSlider";

const providers = zebar.createProviderGroup({
  date: { type: "date", refreshInterval: 1000 },
  memory: { type: "memory", refreshInterval: 1000 },
  cpu: { type: "cpu", refreshInterval: 1000 },
  audio: { type: "audio" }
});

function formatTime(output: DateOutput | null) {
  if (output == null) return { time: "0:00", meridiem: "AM" };

  const date = output.new;
  let hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const meridiem = hours < 12 ? "AM" : "PM";
  hours = hours % 12 || 12;
  return { time: `${hours}:${minutes}`, meridiem };
}

function formatDate(output: DateOutput | null) {
  if (output == null) {
    return {
      dayName: "Mon",
      month: 0,
      dayOfMonth: 0,
    };
  }
  const date = output.new;

  let dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  switch (dayName) {
    case "Tuesday":
    case "Thursday":
      dayName = dayName.slice(0, 4);
      break;
    default:
      dayName = dayName.slice(0, 3);
      break;
  }

  return { dayName, month: date.getMonth(), dayOfMonth: date.getDate() };
}

function formatMemory(memory: MemoryOutput | null) {
  if (memory == null) return 0;
  const toGigabytes = (bytes: number) => (bytes / (1024 * 1024 * 1024))
  return Math.round(100 * toGigabytes(memory.usedMemory) / toGigabytes(memory.totalMemory));
}

function disableContextMenu(event: MouseEvent) {
  event.preventDefault();
}

export default function App() {
  const [output, setOutput] = useState(providers.outputMap);

  useEffect(() => {
    providers.onOutput(() => setOutput(providers.outputMap));

    // Disable right-click menu.
    window.addEventListener("contextmenu", disableContextMenu);

    return () => window.removeEventListener("contextmenu", disableContextMenu);
  }, []);

  const { time, meridiem } = formatTime(output.date);
  const { dayName, month, dayOfMonth } = formatDate(output.date);
  const memoryUsage = formatMemory(output.memory);

  return output && (
    <div id="vertical-bar">
      <Chip iconName="oct-clock">
        <div>{time}</div>
        <div>{meridiem}</div>
      </Chip>
      <Chip iconName="md-calendar">
        <div>{dayName}</div>
        <div>{month}/{dayOfMonth}</div>
      </Chip>
      <Chip iconName="md-triangle_wave">
        <div>CPU</div>
        <Progress value={output.cpu == null ? 0 : Math.round(output.cpu.usage)} warningPercent={80} />
      </Chip>
      <Chip iconName="md-memory">
        <div>RAM</div>
        <Progress value={memoryUsage} warningPercent={90} />
      </Chip>
      <div className="chip">
        <VolumeSlider audio={output.audio} />
      </div>
    </div>
  )
}