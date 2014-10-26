import 'dart:html';
import 'package:polymer/polymer.dart';
import 'pref.dart';

@CustomTag('chewcrew-vote')
class Vote extends PolymerElement {

  @observable String phase = 'wait';

  List choices;
  List voters = new List();

  Vote.created() : super.created() {
    // Load participants list
    voters.addAll(["You", "Voter1", "Voter2", "Voter3"]);

    // Load choices list
    choices = toObservable(['Boracho', 'Boracho', 'Boracho']);
  }

  start() {
    this.phase = 'vote';
  }

  vote() {
    this.phase = 'done';
  }
}