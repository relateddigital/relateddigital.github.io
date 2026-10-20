import React from 'react';
import {
  useVersions,
  useActiveDocContext,
  useDocsVersionCandidates,
  useDocsPreferredVersion,
} from '@docusaurus/plugin-content-docs/client';
import {translate} from '@docusaurus/Translate';
import {useHistorySelector} from '@docusaurus/theme-common';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';

function getVersionItems(versions, configs) {
  if (configs) {
    const versionMap = new Map(
      versions.map((version) => [version.name, version]),
    );
    const toVersionItem = (name, config) => {
      const version = versionMap.get(name);
      if (!version) {
        throw new Error(
          `No docs version exist for name '${name}'. Available version names:\n- ${versions
            .map((item) => item.name)
            .join('\n- ')}`,
        );
      }
      return {version, label: config?.label ?? version.label};
    };
    if (Array.isArray(configs)) {
      return configs.map((name) => toVersionItem(name, undefined));
    }
    return Object.entries(configs).map(([name, config]) =>
      toVersionItem(name, config),
    );
  }
  return versions.map((version) => ({version, label: version.label}));
}

function useVersionItems({docsPluginId, configs}) {
  const versions = useVersions(docsPluginId);
  return getVersionItems(versions, configs);
}

function getVersionMainDoc(version) {
  return version.docs.find((doc) => doc.id === version.mainDocId);
}

function getVersionTargetDoc(version, activeDocContext) {
  return (
    activeDocContext.alternateDocVersions[version.name] ??
    getVersionMainDoc(version)
  );
}

function useDisplayedVersionItem({docsPluginId, versionItems}) {
  const candidates = useDocsVersionCandidates(docsPluginId);
  const candidateItems = candidates
    .map((candidate) => versionItems.find((item) => item.version === candidate))
    .filter((item) => item !== undefined);
  return candidateItems[0] ?? versionItems[0];
}

export default function DocsVersionDropdownNavbarItem({
  mobile,
  docsPluginId,
  dropdownActiveClassDisabled,
  dropdownItemsBefore = [],
  dropdownItemsAfter = [],
  versions: configs,
  ...props
}) {
  const search = useHistorySelector((history) => history.location.search);
  const hash = useHistorySelector((history) => history.location.hash);
  const activeDocContext = useActiveDocContext(docsPluginId);
  const {savePreferredVersionName} = useDocsPreferredVersion(docsPluginId);
  const versionItems = useVersionItems({docsPluginId, configs});
  const displayedVersionItem = useDisplayedVersionItem({
    docsPluginId,
    versionItems,
  });

  if (!activeDocContext.activeVersion) {
    return null;
  }

  function versionItemToLink({version, label}) {
    const targetDoc = getVersionTargetDoc(version, activeDocContext);
    return {
      label,
      to: `${targetDoc.path}${search}${hash}`,
      isActive: () => version === activeDocContext.activeVersion,
      onClick: () => savePreferredVersionName(version.name),
    };
  }

  const items = [
    ...dropdownItemsBefore,
    ...versionItems.map(versionItemToLink),
    ...dropdownItemsAfter,
  ];
  const dropdownLabel =
    mobile && items.length > 1
      ? translate({
          id: 'theme.navbar.mobileVersionsDropdown.label',
          message: 'Versions',
          description:
            'The label for the navbar versions dropdown on mobile view',
        })
      : displayedVersionItem.label;
  const dropdownTo =
    mobile && items.length > 1
      ? undefined
      : getVersionTargetDoc(displayedVersionItem.version, activeDocContext)
          .path;

  if (items.length <= 1) {
    return (
      <DefaultNavbarItem
        {...props}
        mobile={mobile}
        label={dropdownLabel}
        to={dropdownTo}
        isActive={dropdownActiveClassDisabled ? () => false : undefined}
      />
    );
  }

  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={dropdownLabel}
      to={dropdownTo}
      items={items}
      isActive={dropdownActiveClassDisabled ? () => false : undefined}
    />
  );
}
