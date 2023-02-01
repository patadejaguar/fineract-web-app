import { TranslateService } from '@ngx-translate/core';
/** Keyboard Shortcuts Button Configuration */
export class KeyboardShortcutsConfiguration {

    buttonsArray: {
        title: string,
        ctrlKey: boolean,
        shiftKey: boolean,
        altKey: boolean,
        key: string,
        route: string,
        id?: string
    }[];

    constructor(private translateService: TranslateService) {
        this.makeCombination();
    }

    makeCombination() {
        this.buttonsArray = [
            // Navigation Page - alt + n
            {
                title: this.translateService.instant('Navigation Page'),
                ctrlKey: false,
                shiftKey: false,
                altKey: true,
                key: 'n',
                route: 'navigation'
            },
            // Run Report - alt + r
            {
                title: this.translateService.instant('Run Report'),
                ctrlKey: false,
                shiftKey: false,
                altKey: true,
                key: 'r',
                route: '',
                id: 'runReport'
            },
            // Checker Inbox & Pending Tasks - ctrl + alt + i
            {
              title: this.translateService.instant('Checker Inbox & Pending Tasks'),
              ctrlKey: true,
              shiftKey: false,
              altKey: true,
              key: 'i',
              route: 'checker-inbox-and-tasks/checker-inbox'
            },
            // Collection Sheet- ctrl + alt + o
            // {
            // title: 'Collection Sheet',
            // ctrlKey: true,
            // shiftKey: false,
            // altKey: true,
            // key: 'o',
            // route: ''
            // },
            // Create Client - ctrl + alt + c
            {
                title: this.translateService.instant('Create Client'),
                ctrlKey: true,
                shiftKey: false,
                altKey: true,
                key: 'c',
                route: 'clients/create'
            },
            // Create Group - ctrl + alt + g
            {
                title: this.translateService.instant('Create Group'),
                ctrlKey: true,
                shiftKey: false,
                altKey: true,
                key: 'g',
                route: 'groups/create'
            },
            // Create Center - ctrl + alt + q
            {
                title: this.translateService.instant('Create Center'),
                ctrlKey: true,
                shiftKey: false,
                altKey: true,
                key: 'q',
                route: 'centers/create'
            },
            // Frequent Posting - ctrl + alt + f
            {
                title: this.translateService.instant('Frequent Posting'),
                ctrlKey: true,
                shiftKey: false,
                altKey: true,
                key: 'f',
                route: 'accounting/journal-entries/frequent-postings'
            },
            // Closure Entries - ctrl + alt + e
            {
                title: this.translateService.instant('Closure Entries'),
                ctrlKey: true,
                shiftKey: false,
                altKey: true,
                key: 'e',
                route: 'accounting/closing-entries'
            },
            // Journal Entry - ctrl + alt + j
            {
                title: this.translateService.instant('Journal Entry'),
                ctrlKey: true,
                shiftKey: false,
                altKey: true,
                key: 'j',
                route: 'accounting/journal-entries/create'
            },
            // Reports - ctrl + alt + r
            {
                title: this.translateService.instant('Reports'),
                ctrlKey: true,
                shiftKey: false,
                altKey: true,
                key: 'r',
                route: 'reports'
            },
            // Accounting - ctrl + alt + a
            {
                title: this.translateService.instant('Accounting'),
                ctrlKey: true,
                shiftKey: false,
                altKey: true,
                key: 'a',
                route: 'accounting'
            },
            // Save/Submit Forms - ctrl + alt + s
            {
                title: this.translateService.instant('Save/Submit Forms'),
                ctrlKey: true,
                shiftKey: false,
                altKey: true,
                key: 's',
                route: '',
                id: 'submit'
            },
            // Cancel - ctrl + alt + x
            {
                title: this.translateService.instant('Cancel'),
                ctrlKey: true,
                shiftKey: false,
                altKey: true,
                key: 'x',
                route: '',
                id: 'cancel'
            },
            // Help - ctrl + alt + h
            {
                title: this.translateService.instant('Help'),
                ctrlKey: true,
                shiftKey: false,
                altKey: true,
                key: 'h',
                route: '',
                id: 'help'
            },
            // Pagination: Next - ctrl + n
            // {
            //     title: 'Pagination: Next'
            //     ctrlKey: true,
            //     shiftKey: false,
            //     altKey: true,
            //     key: 'n,
            //     route: ''
            // },
            // Pagination: Previous - ctrl + p
            // {
            //     title: 'Pagination: Previous'
            //     ctrlKey: true,
            //     shiftKey: false,
            //     altKey: true,
            //     key: 'p,
            //     route: ''
            // },
            // Logout - ctrl + shift + l
            {
                title: this.translateService.instant('Logout'),
                ctrlKey: true,
                shiftKey: true,
                altKey: false,
                key: 'l',
                route: '',
                id: 'logout'
            }
        ];
    }

    get buttonCombinations() {
        return this.buttonsArray;
    }

}
