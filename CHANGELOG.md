# v0.1.2 (Wed Nov 22 2023)

#### 🐛 Bug Fix

- Allow loaders to be synchronous or void [#71](https://github.com/ComponentDriven/csf/pull/71) ([@kasperpeulen](https://github.com/kasperpeulen))
- Move `types` condition to the front [#69](https://github.com/ComponentDriven/csf/pull/69) ([@Andarist](https://github.com/Andarist))

#### Authors: 2

- Kasper Peulen ([@kasperpeulen](https://github.com/kasperpeulen))
- Mateusz Burzyński ([@Andarist](https://github.com/Andarist))

---

# v0.1.1 (Fri Jun 02 2023)

#### 🐛 Bug Fix

- Move `types` condition to the front [#70](https://github.com/ComponentDriven/csf/pull/70) ([@Andarist](https://github.com/Andarist))

#### Authors: 1

- Mateusz Burzyński ([@Andarist](https://github.com/Andarist))

---

# v0.1.0 (Mon Apr 03 2023)

#### 🚀 Enhancement


#### 🐛 Bug Fix

- Turn Args interfaces into types when passed to decorators [#65](https://github.com/ComponentDriven/csf/pull/65) ([@kasperpeulen](https://github.com/kasperpeulen))
- Improve the startcase implementation to mimick lodash's version more closely [#64](https://github.com/ComponentDriven/csf/pull/64) ([@ndelangen](https://github.com/ndelangen))
- replace lodash [#62](https://github.com/ComponentDriven/csf/pull/62) ([@ndelangen](https://github.com/ndelangen))
- Fix bug with meta not working well as generic parameter for StoryObj [#60](https://github.com/ComponentDriven/csf/pull/60) ([@kasperpeulen](https://github.com/kasperpeulen))
- Make sure that index signatures (used in decorators) don't cause unexpected types [#58](https://github.com/ComponentDriven/csf/pull/58) ([@kasperpeulen](https://github.com/kasperpeulen))
- Add strict variants for Args and Paramters to CSF [#57](https://github.com/ComponentDriven/csf/pull/57) ([@kasperpeulen](https://github.com/kasperpeulen))
- Revert stricter parameters [#56](https://github.com/ComponentDriven/csf/pull/56) ([@kasperpeulen](https://github.com/kasperpeulen))
- Use builtin installation of actions/setup-node [#55](https://github.com/ComponentDriven/csf/pull/55) ([@kasperpeulen](https://github.com/kasperpeulen))
- Rename Framework to Renderer [#54](https://github.com/ComponentDriven/csf/pull/54) ([@kasperpeulen](https://github.com/kasperpeulen))
- Rework Framework type to contain `canvasElement` [#53](https://github.com/ComponentDriven/csf/pull/53) ([@tmeasday](https://github.com/tmeasday))
- Add tags annotation at all levels [#52](https://github.com/ComponentDriven/csf/pull/52) ([@tmeasday](https://github.com/tmeasday))
- First attempt at bringing new types over [#29](https://github.com/ComponentDriven/csf/pull/29) ([@tmeasday](https://github.com/tmeasday) [@shilman](https://github.com/shilman) [@ghengeveld](https://github.com/ghengeveld) [@wKich](https://github.com/wKich) [@kasperpeulen](https://github.com/kasperpeulen))
- Revert "Play function can only be set at the story level" [#40](https://github.com/ComponentDriven/csf/pull/40) ([@wKich](https://github.com/wKich) [@shilman](https://github.com/shilman))
- Add conditional arg types and metadata [#36](https://github.com/ComponentDriven/csf/pull/36) ([@shilman](https://github.com/shilman) [@tmeasday](https://github.com/tmeasday) [@kasperpeulen](https://github.com/kasperpeulen))
- Re-apply `TArgs` to CSF `render` type [#43](https://github.com/ComponentDriven/csf/pull/43) ([@tmeasday](https://github.com/tmeasday) [@shilman](https://github.com/shilman) [@kasperpeulen](https://github.com/kasperpeulen))
- Add step to play context and `runStep` to project annotations [#48](https://github.com/ComponentDriven/csf/pull/48) ([@tmeasday](https://github.com/tmeasday) [@shilman](https://github.com/shilman) [@kasperpeulen](https://github.com/kasperpeulen))
- Sound arg types for CSF3 [#49](https://github.com/ComponentDriven/csf/pull/49) ([@kasperpeulen](https://github.com/kasperpeulen) [@shilman](https://github.com/shilman))
- ArgsFromMeta utility and generic ArgsStoryFn RT [#51](https://github.com/ComponentDriven/csf/pull/51) ([@kasperpeulen](https://github.com/kasperpeulen))
- Configure Auto [#50](https://github.com/ComponentDriven/csf/pull/50) ([@shilman](https://github.com/shilman))
- Only make `TArgs` parameterize `args` and `argTypes` in our default annotations [#33](https://github.com/ComponentDriven/csf/pull/33) ([@tmeasday](https://github.com/tmeasday))
- Adding Components.studio as a tool using CSF [#13](https://github.com/ComponentDriven/csf/pull/13) ([@georges-gomes](https://github.com/georges-gomes) [@ghengeveld](https://github.com/ghengeveld))
- Makes name argument for 'toId' optional [#17](https://github.com/ComponentDriven/csf/pull/17) ([@unematiii](https://github.com/unematiii) [@ghengeveld](https://github.com/ghengeveld))
- use permanent url for the header image [#12](https://github.com/ComponentDriven/csf/pull/12) ([@winkerVSbecks](https://github.com/winkerVSbecks))
- fix link to image [#10](https://github.com/ComponentDriven/csf/pull/10) ([@winkerVSbecks](https://github.com/winkerVSbecks))
- Publish under @componentdriven and update README [#8](https://github.com/ComponentDriven/csf/pull/8) ([@winkerVSbecks](https://github.com/winkerVSbecks))
- Add meta types for CSF [#5](https://github.com/ComponentDriven/csf/pull/5) ([@wKich](https://github.com/wKich))
- types of csf properties [#3](https://github.com/ComponentDriven/csf/pull/3) ([@atanasster](https://github.com/atanasster) [@ndelangen](https://github.com/ndelangen))
- Extract @storybook/csf from monorepo [#1](https://github.com/ComponentDriven/csf/pull/1) ([@shilman](https://github.com/shilman))

#### ⚠️ Pushed to `master`

- First commit ([@shilman](https://github.com/shilman))

#### 📝 Documentation

- added storyNameFromExport(key) in README.md [#2](https://github.com/ComponentDriven/csf/pull/2) ([@georges-gomes](https://github.com/georges-gomes) [@shilman](https://github.com/shilman))

#### 🔩 Dependency Updates

- Bump handlebars from 4.5.3 to 4.7.7 [#20](https://github.com/ComponentDriven/csf/pull/20) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump y18n from 4.0.0 to 4.0.3 [#32](https://github.com/ComponentDriven/csf/pull/32) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ini from 1.3.5 to 1.3.8 [#18](https://github.com/ComponentDriven/csf/pull/18) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump yargs-parser from 13.1.1 to 13.1.2 [#15](https://github.com/ComponentDriven/csf/pull/15) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump lodash from 4.17.15 to 4.17.21 [#21](https://github.com/ComponentDriven/csf/pull/21) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump hosted-git-info from 2.8.5 to 2.8.9 [#22](https://github.com/ComponentDriven/csf/pull/22) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump path-parse from 1.0.6 to 1.0.7 [#25](https://github.com/ComponentDriven/csf/pull/25) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump browserslist from 4.11.1 to 4.16.6 [#23](https://github.com/ComponentDriven/csf/pull/23) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump acorn from 5.7.3 to 5.7.4 [#27](https://github.com/ComponentDriven/csf/pull/27) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ws from 5.2.2 to 5.2.3 [#28](https://github.com/ComponentDriven/csf/pull/28) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tar from 4.4.13 to 4.4.19 [#30](https://github.com/ComponentDriven/csf/pull/30) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tmpl from 1.0.4 to 1.0.5 [#31](https://github.com/ComponentDriven/csf/pull/31) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 12

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Atanas Stoyanov ([@atanasster](https://github.com/atanasster))
- Dmitriy Lazarev ([@wKich](https://github.com/wKich))
- Dominic Nguyen ([@domyen](https://github.com/domyen))
- Georges Gomes ([@georges-gomes](https://github.com/georges-gomes))
- Gert Hengeveld ([@ghengeveld](https://github.com/ghengeveld))
- Kasper Peulen ([@kasperpeulen](https://github.com/kasperpeulen))
- Mati Kärner ([@unematiii](https://github.com/unematiii))
- Michael Shilman ([@shilman](https://github.com/shilman))
- Norbert de Langen ([@ndelangen](https://github.com/ndelangen))
- Tom Coleman ([@tmeasday](https://github.com/tmeasday))
- Varun Vachhar ([@winkerVSbecks](https://github.com/winkerVSbecks))
