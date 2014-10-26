import 'dart:html' show Event, Node;
import 'package:polymer/polymer.dart';

@CustomTag('chewcrew-app')
class ChewCrew extends PolymerElement {

  static final String tag = 'chewcrew-app';
  @published String menu = 'home';

  ChewCrew.created() : super.created();

  start(Event e, var detail, Node target) {
    this.menu = 'preferences';
  }
}
