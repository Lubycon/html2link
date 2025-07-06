type Tick = {
  DOM: {
    create: (el: HTMLElement, options: { value: string | string[]; didInit: (tick: TickType) => void }) => void;
    destroy: (tick: TickType) => void;
  };
  value: string | string[];
} | null;

declare module '@pqina/flip' {
  const Tick: Tick;
  export default Tick;
}
