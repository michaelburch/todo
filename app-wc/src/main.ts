import {
    accentPalette,
    PaletteRGB,
    SwatchRGB,
    fluentButton,
    fluentCard,
    fluentDesignSystemProvider,
    fluentTextField,
    provideFluentDesignSystem,
} from "@fluentui/web-components";
import { parseColorHexRGB } from "@microsoft/fast-colors";
import { TitleBar } from "./title-bar";
import { TodoApp } from "./todo-app";
import { TodoForm } from "./todo-form";


provideFluentDesignSystem().register(
    fluentDesignSystemProvider(),
    fluentButton(),
    fluentTextField(),
    fluentCard(),

);
accentPalette.setValueFor(
 document.body,PaletteRGB.create(SwatchRGB.from(parseColorHexRGB
    ('#3f75a2')!))
);
TodoApp;
TodoForm;
TitleBar;
