import {Resources, SrcType} from "../Interfaces/word.interface";
import {SrcTypeBuilder} from "./src-type.builder";

export class ResourcesBuilder {
  private readonly _resource: Resources = {
    audio: SrcTypeBuilder.newInstance().build(),
    conj: SrcTypeBuilder.newInstance().build(),
    img: SrcTypeBuilder.newInstance().build(),
    video: SrcTypeBuilder.newInstance().build()
  };

  static newInstance(): ResourcesBuilder {
    return new ResourcesBuilder();
  }

  withAudio(audio: SrcType): ResourcesBuilder {
    this._resource.audio = audio;
    return this;
  }

  withImg(img: SrcType): ResourcesBuilder {
    this._resource.img = img;
    return this;
  }

  withVideo(video: SrcType): ResourcesBuilder {
    this._resource.video = video;
    return this;
  }

  withConj(conj: SrcType): ResourcesBuilder {
    this._resource.conj = conj;
    return this;
  }

  build(): Resources {
    return this._resource;
  }
}
