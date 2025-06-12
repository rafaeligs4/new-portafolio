// slider.component.ts
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ProjectData } from '../../../models/ProjectData.interface';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CarrouselComponent implements OnInit,AfterViewInit {
  @ViewChild('sliderRef') sliderRef!: ElementRef;

  // Array original y array con clones para el loop infinito
 @Input() slidesOriginal: ProjectData[] = [
  {
    title: 'Aplicación #1',
    description: 'Descripción 1',
    icon: './svg/github.svg',
    repoUrl: '#',
    etiquetas: [
      { nombre: 'Ola' },
      { nombre: 'Mundo' }
    ]
  },
  {
    title: 'Aplicación #2',
    description: 'Descripción 2',
    icon: './svg/github.svg',
    repoUrl: '#',
    etiquetas: [
      { nombre: 'Etiqueta1' },
      { nombre: 'Etiqueta2' }
    ]
  },
  {
    title: 'Aplicación #3',
    description: 'Descripción 3',
    icon: './svg/github.svg',
    repoUrl: '#',
    etiquetas: [
      { nombre: 'EtiquetaA' },
      { nombre: 'EtiquetaB' }
    ]
  }
];
  slides: any[] = [];
  currentSlide: number = 1;

  isDragging: boolean = false;
  startX: number = 0;
  dragOffset: number = 0;
  sliderWidth: number = 0;
  transitionStyle: string = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  ngOnInit(): void {
    if (this.slidesOriginal.length > 0) {
      this.slides = [
        this.slidesOriginal[this.slidesOriginal.length - 1], // clon final al inicio
        ...this.slidesOriginal,
        this.slidesOriginal[0]  // clon inicial al final
      ];
      this.currentSlide = 1;
    }
  }

  ngAfterViewInit(): void {
    this.sliderWidth = this.sliderRef.nativeElement.offsetWidth;
  }
  
  @HostListener('window:resize')
  onResize() {
    this.sliderWidth = this.sliderRef.nativeElement.offsetWidth;
  }

  // Eventos de arrastre
  onDragStart(event: MouseEvent | TouchEvent): void {
    this.isDragging = true;
    if (event instanceof MouseEvent) {
      this.startX = event.pageX;
    } else {
      this.startX = event.touches[0].pageX;
    }
  }

  onDragMove(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;
    const currentX = event instanceof MouseEvent ? event.pageX : event.touches[0].pageX;
    this.dragOffset = currentX - this.startX;
    event.preventDefault();
  }

  onDragEnd(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;
    this.isDragging = false;

    // Se define un umbral (por ejemplo, 25% del ancho) para determinar si se cambia de slide
    if (Math.abs(this.dragOffset) > this.sliderWidth / 4) {
      if (this.dragOffset < 0) {
        // Deslizar hacia la izquierda (siguiente slide)
        this.currentSlide++;
      } else {
        // Deslizar hacia la derecha (slide anterior)
        this.currentSlide--;
      }
    }
    // Reiniciamos el offset para retornar a la posición natural
    this.dragOffset = 0;
  }

  // Este getter combina la posición base del slide y el offset del arrastre
  get transformValue(): string {
    return `translateX(-${this.currentSlide * this.sliderWidth - this.dragOffset}px)`;
  }

  // Avanzar al siguiente slide (por botón o swipe)
  nextSlide(): void {
    this.currentSlide++;
    this.onTransitionEnd();
  }

  // Retroceder al slide anterior
  prevSlide(): void {
    this.currentSlide--;
    this.onTransitionEnd();
  }

  // Navegación por círculos (los índices deben ajustarse, ya que el 0 es el clon final)
  goToSlide(index: number): void {
    this.currentSlide = index + 1;
  }

  // Manejo de finalización de la transición para el loop infinito
  onTransitionEnd(): void {
    // Si el índice es 0, significa que se mostró el clon del último slide.
    if (this.currentSlide === 0) {
      // Desactivamos la transición para repositionar sin animar
      this.transitionStyle = 'none';
      // Se ajusta al último slide real (que se encuentra en índice slides.length - 2)
      this.currentSlide = this.slidesOriginal.length;
      // Reestablecemos la transición en el siguiente ciclo de ejecución
      setTimeout(() => {
        this.transitionStyle = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }, 0);
    } 
    // Si el índice es el último (slides.length - 1), se mostró el clon del primer slide.
    else if (this.currentSlide === this.slides.length - 1) {
      this.transitionStyle = 'none';
      this.currentSlide = 1;
      setTimeout(() => {
        this.transitionStyle = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }, 0);
    }
  }
}

