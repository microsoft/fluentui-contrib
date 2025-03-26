import * as React from 'react';
import {
  makeStyles,
  tokens,
  Field,
  ToolbarButton,
  Textarea,
} from '@fluentui/react-components';
import {
  CursorClickRegular,
  ClipboardCheckmarkRegular,
  CloudSyncRegular,
} from '@fluentui/react-icons';
import { Footer } from '@fluentui-contrib/react-contextual-pane';

const useStyles = makeStyles({
  root: {
    padding: '8px',
  },

  pane: {
    width: '320px',
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    height: '200px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'end',
  },
  editor: {
    width: '100%',
    height: '100%',
    padding: '16px',
  },
  textArea: {
    width: '100%',
  },
});

export const CustomChildren = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <h1>Default</h1>
      <p>
        There's the limit to render one action/button in the left and maximum of
        2
      </p>
      <div className={styles.pane}>
        <Footer
          toolbarLables={{
            leftActionsAriaLabel:
              'Left actions ( should be translated string )',
            rightActionsAriaLabel:
              'Right actions ( should be translated string )',
          }}
          leftActions={
            <ToolbarButton
              appearance="transparent"
              icon={<CursorClickRegular />}
            />
          }
          rightActions={[
            <ToolbarButton
              appearance="transparent"
              key="clipboard"
              icon={<ClipboardCheckmarkRegular />}
            />,
            <ToolbarButton
              appearance="transparent"
              key="cloud"
              icon={<CloudSyncRegular />}
            />,
          ]}
        />
      </div>

      <h1>With custom children</h1>
      <Field className={styles.pane}>
        <Footer
          toolbarLables={{
            leftActionsAriaLabel:
              'Left actions ( should be translated string )',
            rightActionsAriaLabel:
              'Right actions ( should be translated string )',
          }}
        >
          <div className={styles.editor}>
            <Textarea
              placeholder="Type something"
              className={styles.textArea}
            />
          </div>
        </Footer>
      </Field>
    </div>
  );
};
