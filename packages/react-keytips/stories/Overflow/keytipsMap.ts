import { ExecuteKeytipEventHandler } from '@fluentui-contrib/react-keytips';

export const onExecute: ExecuteKeytipEventHandler = (_, { targetElement }) => {
  if (targetElement) {
    console.info(targetElement);
    targetElement.focus();
    targetElement.click();
  }
};

export const helpKeytips = {
  help: {
    content: 'H',
    keySequences: ['e', 'h'],
    onExecute,
  },
  tips: {
    content: 'P',
    keySequences: ['e', 'p'],
    onExecute,
  },
  support: {
    content: 'U',
    keySequences: ['e', 'u'],
    onExecute,
  },
  feedback: {
    content: 'F',
    keySequences: ['e', 'f'],
    onExecute,
  },
  rollout: {
    content: 'R',
    keySequences: ['e', 'r'],
    onExecute,
  },
  overflowButton: {
    hasMenu: true,
    content: '00',
    keySequences: ['e', '00'],
    onExecute,
  },
};

export const homeKeytips = {
  newMail: {
    content: 'N',
    keySequences: ['h', 'n'],
    hasMenu: true,
    onExecute,
  },
  newMailMenu: [
    {
      content: 'M',
      keySequences: ['h', 'n', 'm'],
      onExecute,
    },
    {
      content: 'E',
      keySequences: ['h', 'n', 'e'],
      onExecute,
    },
    {
      content: 'U',
      keySequences: ['h', 'n', 'g'],
      onExecute,
    },
    {
      content: 'Y',
      keySequences: ['h', 'n', 's'],
      onExecute,
    },
    {
      content: 'NA',
      keySequences: ['h', 'n', 'na'],
      onExecute,
    },
    {
      content: 'X',
      keySequences: ['h', 'n', 'x'],
      onExecute,
    },
    {
      content: 'P',
      keySequences: ['h', 'n', 'p'],
      onExecute,
    },
  ],
  delete: {
    content: 'D',
    keySequences: ['h', 'd'],
    onExecute,
  },
  archive: {
    content: 'O',
    keySequences: ['h', 'o'],
    onExecute,
  },
  report: {
    content: 'RE',
    keySequences: ['h', 're'],
    onExecute,
  },
  add: {
    content: 'MV',
    keySequences: ['h', 'mv'],
    onExecute,
  },
  flag: {
    content: 'U',
    keySequences: ['h', 'u'],
    onExecute,
  },
  groups: {
    content: 'VG',
    keySequences: ['h', 'vg'],
    onExecute,
  },
  pin: {
    content: 'Y',
    keySequences: ['h', 'y'],
    onExecute,
  },
  quickSteps: {
    content: 'QS',
    keySequences: ['h', 'qs'],
    hasMenu: true,
    onExecute,
  },
  quickStepsMenuItem: {
    content: '1',
    keySequences: ['h', 'qs', '1'],
    onExecute,
  },
  read: {
    content: 'W',
    keySequences: ['h', 'w'],
    onExecute,
  },
  overflowButton: {
    hasMenu: true,
    content: '00',
    keySequences: ['h', '00'],
    onExecute,
  },
};

export const viewKeytips = {
  viewSettings: {
    content: 'V',
    keySequences: ['v', 'v'],
    onExecute,
  },
  messages: {
    content: 'M',
    keySequences: ['v', 'm'],
    onExecute,
  },
  zoom: {
    content: 'Z',
    keySequences: ['v', 'z'],
    onExecute,
  },
  sync: {
    content: 'S',
    keySequences: ['v', 's'],
    onExecute,
  },
  layout: {
    content: 'A',
    keySequences: ['v', 'a'],
    hasMenu: true,
    onExecute,
  },
  folderPane: {
    content: 'F',
    keySequences: ['v', 'f'],
    onExecute,
  },
  density: {
    content: 'D',
    keySequences: ['v', 'd'],
    onExecute,
  },
  overflowButton: {
    hasMenu: true,
    content: '00',
    keySequences: ['v', '00'],
    onExecute,
  },
};
