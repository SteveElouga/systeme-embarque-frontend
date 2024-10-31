import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatRipple} from "@angular/material/core";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {animate, animateChild, query, stagger, state, style, transition, trigger} from "@angular/animations";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-about-app',
  standalone: true,
  imports: [
    MatButton,
    MatProgressSpinner,
    MatRipple,
    NgForOf,
    NgIf,
    MatTooltip,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './about-app.component.html',
  styleUrl: './about-app.component.scss',
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@listItem', [
          stagger(50, [
            animateChild()
          ])
        ])
      ])
    ]),
    trigger('listItem', [
      state('default', style({
        "box-shadow": "0px 0px 6px rgba(0, 0, 0, 0.3)",
        'z-index': '1',
      })),
      state('active', style({
        transform: "translateY(-5px)",
        "box-shadow": "0px 0px 10px rgba(0, 0, 0, 0.6)",
        'z-index': '2',
      })),
      transition('default => active', [
        animate('100ms ease-in-out'),
      ]),
      transition('active => default', [
        animate('100ms ease-in-out'),
      ]),
      transition(':enter', [
        style({
          transform: 'translateX(-100%)',
          opacity: '0',
        }),
        animate('500ms ease-in-out', style({
          transform: 'translateX(0%)',
          opacity: '1',
        })),
      ])
    ])
  ],
  // encapsulation: ViewEncapsulation.None
})
export class AboutAppComponent implements OnInit {
  functionnalities = [
    {
      h5: "Ajoutez facilement des médias à votre bibliothèque.",
      p: "Cette fonctionnalite permet de creer un nouveau media",
      color: "#49CC90"
    },
    {
      h5: "Recuperz vos medias",
      p: "Cette fonctionnalite permet de recuperer les medias par types (images, texte, audios, etc...",
      color: "#61AFFE"
    },
    {
      h5: "Deplacez un media dans la corbeille.",
      p: "Cette fonctionnalite permet d'envoyer facilement un fichier dans la corbeille",
      color: "#50E3C2"
    },
    {
      h5: "Restaurez un média depuis la corbeille.",
      p: "Cette fonctionnalite permet de restaurer un media present dans la corbeille",
      color: "#50E3C2"
    },
    {
      h5: "Supprimez definitivement un média.",
      p: "Cette fonctionnalite permet de supprimer un media",
      color: "#F93E3E"
    }
  ]
  animationsStates: { [key: string]: 'default' | 'active' } = {};

  centered = false;
  disabled = false;
  unbounded = false;

  radius!: number;
  color!: string;

  loading = true

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false
    }, 1000)
    for (let index in this.functionnalities) {
      this.animationsStates[index] = 'default'
    }
  }

  onListItemMouseEnter(index: number): void {
    this.animationsStates[index] = 'active'
  }

  onListItemMouseLeave(index: number): void {
    this.animationsStates[index] = 'default'
  }

  addMedia() {
    this.router.navigateByUrl("add")
  }
}
