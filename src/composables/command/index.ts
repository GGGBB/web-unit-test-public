export interface Command {
  name: string
  execute: () => void
}
let commands: Command[] = []
export function useCommand() {
  function resetCommand() {
    commands = []
  }
  function addCommand(command: Command) {
    commands.push(command)
  }
  return { resetCommand, addCommand, commands }
}
