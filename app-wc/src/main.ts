import {
    accentPalette,
    PaletteRGB,
    SwatchRGB,
    fluentButton,
    fluentCard,
    fluentCheckbox,
    fluentDesignSystemProvider,
    fluentSlider,
    fluentSliderLabel,
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
    fluentCheckbox(),
    fluentTextField(),
    fluentCard(),
    fluentSlider(),
    fluentSliderLabel()
);
accentPalette.setValueFor(
 document.body,PaletteRGB.create(SwatchRGB.from(parseColorHexRGB
    ('#3f75a2')!))
);
TodoApp;
TodoForm;
TitleBar;
