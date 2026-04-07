import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppState from 'App/State/AppState';
import Icon from 'Components/Icon';
import Menu from 'Components/Menu/Menu';
import MenuButton from 'Components/Menu/MenuButton';
import MenuContent from 'Components/Menu/MenuContent';
import MenuItem from 'Components/Menu/MenuItem';
import MenuItemSeparator from 'Components/Menu/MenuItemSeparator';
import { align, icons, kinds } from 'Helpers/Props';
import { restart, restartDb, shutdown } from 'Store/Actions/systemActions';
import translate from 'Utilities/String/translate';
import styles from './PageHeaderActionsMenu.module.css';

interface PageHeaderActionsMenuProps {
  onKeyboardShortcutsPress(): void;
}

function PageHeaderActionsMenu(props: PageHeaderActionsMenuProps) {
  const { onKeyboardShortcutsPress } = props;

  const dispatch = useDispatch();

  const { authentication, isDocker } = useSelector(
    (state: AppState) => state.system.status.item
  );

  const formsAuth = authentication === 'forms';

  const handleRestartPress = useCallback(() => {
    dispatch(restart());
  }, [dispatch]);

  const handleRestartDbPress = useCallback(() => {
    if (
      // eslint-disable-next-line no-alert
      window.confirm(
        'Are you sure you want to completely wipe the database and restart? This cannot be undone.'
      )
    ) {
      dispatch(restartDb());
    }
  }, [dispatch]);

  const handleShutdownPress = useCallback(() => {
    dispatch(shutdown());
  }, [dispatch]);

  return (
    <div>
      <Menu alignMenu={align.RIGHT}>
        <MenuButton className={styles.menuButton} aria-label="Menu Button">
          <Icon name={icons.INTERACTIVE} title={translate('Menu')} />
        </MenuButton>

        <MenuContent>
          <MenuItem onPress={onKeyboardShortcutsPress}>
            <Icon className={styles.itemIcon} name={icons.KEYBOARD} />
            {translate('KeyboardShortcuts')}
          </MenuItem>

          <MenuItemSeparator />

          <MenuItem onPress={handleRestartDbPress}>
            <Icon
              className={styles.itemIcon}
              name={icons.RESTART}
              kind={kinds.DANGER}
            />
            Restart DB (Wipe)
          </MenuItem>

          {isDocker ? null : (
            <>
              <MenuItemSeparator />

              <MenuItem onPress={handleRestartPress}>
                <Icon className={styles.itemIcon} name={icons.RESTART} />
                {translate('Restart')}
              </MenuItem>

              <MenuItem onPress={handleShutdownPress}>
                <Icon
                  className={styles.itemIcon}
                  name={icons.SHUTDOWN}
                  kind={kinds.DANGER}
                />
                {translate('Shutdown')}
              </MenuItem>
            </>
          )}

          {formsAuth ? (
            <>
              <MenuItemSeparator />

              <MenuItem
                to={`${window.Melodarr.urlBase}/logout`}
                noRouter={true}
              >
                <Icon className={styles.itemIcon} name={icons.LOGOUT} />
                {translate('Logout')}
              </MenuItem>
            </>
          ) : null}
        </MenuContent>
      </Menu>
    </div>
  );
}

export default PageHeaderActionsMenu;
