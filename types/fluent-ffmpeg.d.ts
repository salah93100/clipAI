declare module 'fluent-ffmpeg' {
  interface FfmpegCommand {
    outputFormat(format: string): this;
    videoCodec(codec: string): this;
    audioCodec(codec: string): this;
    videoFilters(filters: string | string[]): this;
    outputOptions(options: string[]): this;
    save(outputPath: string): this;
    on(event: 'start', callback: () => void): this;
    on(event: 'progress', callback: (progress: any) => void): this;
    on(event: 'end', callback: () => void): this;
    on(event: 'error', callback: (err: Error) => void): this;
    on(event: string, callback: (...args: any[]) => void): this;
  }

  function ffmpeg(input: string): FfmpegCommand;
  export = ffmpeg;
} 