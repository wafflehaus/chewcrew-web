import 'dart:html';
import 'package:polymer/polymer.dart';
import 'app.dart';

@CustomTag('chewcrew-pref')
class Preferences extends PolymerElement {

  @observable String name = '';

  List categories;

  Preferences.created() : super.created() {
    categories = getCategories();
  }

  List getCategories() {
    return toObservable(['Murcan', 'Texan', 'Chinese', 'Japanese', 'Boracho', 'Texmex']);
  }

  start() {
    // TODO: Figure out how to properly use events. This feels messy.
    ChewCrew cc = querySelector(ChewCrew.tag);
    cc.menu = 'vote';
  }
}
