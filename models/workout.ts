type workout ={
    date: string;
    name: string;
    explanation: string;
    repetition: string;
    rest: string;
    rir: string;
}

export class Exercise {
    private constructor(
      public date: string,
      public name: string,
      public explanation: string,
      public repetitions: string,
      public rest: string,
      public rir: string,
    ) {
      this.validateWorkout();
    }
  
    private validateWorkout(): void {
    }
  
    public static create(props: workout): Exercise {
      return new Exercise(
        props.date, 
        props.name, 
        props.explanation,
        props.repetition,
        props.rest,
        props.rir);
    }
  }
  