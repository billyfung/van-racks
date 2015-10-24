class ChangingPrecision < ActiveRecord::Migration
  def change
  	change_column :things, :lat, :decimal, :precision =>17, :scale=>14
  end
end
