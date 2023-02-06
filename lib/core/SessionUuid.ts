import { v4 as uuid4 } from 'uuid'

export interface ISession {
  uuid: string;
}

export class SessionUuid {
  protected sessionVar: string
  protected session: ISession

  constructor( sessionVar: string ) {
    this.sessionVar = sessionVar
  }

  get uuid(): string {
    if ( this.session ) {
      return this.session.uuid
    }

    this.session = this.generateSession()
    this.saveSession()

    return this.session.uuid
  }

  protected generateSession(): ISession {
    const uuid: string | null = sessionStorage.getItem( this.sessionVar )
    return {
      uuid: uuid === null ? uuid4() : uuid,
    }
  }

  protected saveSession(): void {
    sessionStorage.setItem( this.sessionVar, this.session.uuid )
  }
}
