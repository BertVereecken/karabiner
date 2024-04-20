import fs from "fs";
import {KarabinerRules} from "./types";
import {createHyperSubLayers, app, open} from "./utils";

const rules: KarabinerRules[] = [
    // Define the Hyper key itself
    {
        description: "Hyper Key (⌃⌥⇧⌘)",
        manipulators: [
            {
                description: "Caps Lock -> Hyper Key",
                from: {
                    key_code: "caps_lock",
                    modifiers: {
                        optional: ["any"],
                    },
                },
                to: [
                    {
                        set_variable: {
                            name: "hyper",
                            value: 1,
                        },
                    },
                ],
                to_after_key_up: [
                    {
                        set_variable: {
                            name: "hyper",
                            value: 0,
                        },
                    },
                ],
                to_if_alone: [
                    {
                        key_code: "escape",
                    },
                ],
                type: "basic",
            },
            //      {
            //        type: "basic",
            //        description: "Disable CMD + Tab to force Hyper Key usage",
            //        from: {
            //          key_code: "tab",
            //          modifiers: {
            //            mandatory: ["left_command"],
            //          },
            //        },
            //        to: [
            //          {
            //            key_code: "tab",
            //          },
            //        ],
            //      },
        ],
    },
    ...createHyperSubLayers({
        // b = "B"rowse
        b: {
            t: open("https://twitter.com"),
            // Quarterly "P"lan
            p: open("https://qrtr.ly/plan"),
            y: open("https://news.ycombinator.com"),
            f: open("https://facebook.com"),
            r: open("https://reddit.com"),
        },
        // o = "Open" applications
        o: {
            1: app("1Password"),
            c: app("Google Chrome"),
            g: app("Gitkraken"),
            i: app("IntelliJ IDEA"),
            s: app("Slack"),
            // "N"otes for Obsidian
            n: app("Obsidian"),
            // Maybe switch to WhatsApp desktop app since this will always open a new tab?
            // "W"hatsApp
            w: open("https://web.whatsapp.com/"),
        },

        // s = "System"
        s: {
            u: {
                to: [
                    {
                        key_code: "volume_increment",
                    },
                ],
            },
            j: {
                to: [
                    {
                        key_code: "volume_decrement",
                    },
                ],
            },
            i: {
                to: [
                    {
                        key_code: "display_brightness_increment",
                    },
                ],
            },
            k: {
                to: [
                    {
                        key_code: "display_brightness_decrement",
                    },
                ],
            },
            l: {
                to: [
                    {
                        key_code: "q",
                        modifiers: ["right_control", "right_command"],
                    },
                ],
            },
            p: {
                to: [
                    {
                        key_code: "play_or_pause",
                    },
                ],
            },
            semicolon: {
                to: [
                    {
                        key_code: "fastforward",
                    },
                ],
            },
            e: {
                to: [
                    {
                        // Emoji picker
                        key_code: "spacebar",
                        modifiers: ["right_control", "right_command"],
                    },
                ],
            },
            // "D"o not disturb toggle
            d: open(`raycast://extensions/yakitrak/do-not-disturb/toggle`),
        },

        // c = Musi*c* which isn't "m" because we want it to be on the left hand
        c: {
            p: {
                to: [{key_code: "play_or_pause"}],
            },
            n: {
                to: [{key_code: "fastforward"}],
            },
            b: {
                to: [{key_code: "rewind"}],
            },
        },

        // r = "Raycast"
        r: {
            h: open(
                "raycast://extensions/raycast/clipboard-history/clipboard-history"
            ),
            l: open(
                "raycast://extensions/tonka3000/homeassistant/lights"
            ),
        },
    }),
];

fs.writeFileSync(
    "karabiner.json",
    JSON.stringify(
        {
            global: {
                show_in_menu_bar: false,
            },
            profiles: [
                {
                    name: "Default",
                    complex_modifications: {
                        rules,
                    },
                },
            ],
        },
        null,
        2
    )
);
